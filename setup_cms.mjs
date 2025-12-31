import PocketBase from 'pocketbase';

const pb = new PocketBase('https://oswayo-cms.turek.in');

const adminEmail = 'jt@dweeb.net';
const adminPassword = '1johntom1';

async function main() {
    console.log("Starting CMS setup...");

    // 1. Authenticate or Create Admin
    try {
        console.log("Attempting to authenticate as admin...");
        await pb.admins.authWithPassword(adminEmail, adminPassword);
        console.log("Admin authenticated successfully.");
    } catch (authError) {
        console.log("Admin authentication failed. Assuming fresh instance, attempting to create first admin...");
        try {
            // For the very first admin, we can just create it.
            await pb.admins.create({
                email: adminEmail,
                password: adminPassword,
                passwordConfirm: adminPassword,
            });
            console.log("Admin account created successfully.");
            // Login again to be sure
            await pb.admins.authWithPassword(adminEmail, adminPassword);
        } catch (createError) {
            console.error("Failed to create admin:", createError);
            process.exit(1);
        }
    }

    // 2. Create 'news' collection
    try {
        console.log("Checking for 'news' collection...");
        try {
            await pb.collections.getOne('news');
            console.log("'news' collection already exists.");
        } catch (e) {
            console.log("'news' collection not found. Creating...");
            const collection = await pb.collections.create({
                name: 'news',
                type: 'base',
                schema: [
                    {
                        name: 'title',
                        type: 'text',
                        required: true,
                    },
                    {
                        name: 'slug',
                        type: 'text',
                        required: true,
                    },
                    {
                        name: 'content',
                        type: 'editor', // Rich text
                    },
                    {
                        name: 'excerpt',
                        type: 'text',
                    },
                    {
                        name: 'image',
                        type: 'file',
                        options: {
                            mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
                            maxSelect: 1
                        }
                    }
                ],
                // Public read rules
                listRule: "",
                viewRule: "",
                // Admin only write rules (default null = admin only)
                createRule: null,
                updateRule: null,
                deleteRule: null,
            });
            console.log("'news' collection created:", collection.id);
        }
    } catch (err) {
        console.error("Error managing collections:", err);
    }

    // 3. Seed some data
    try {
        const records = await pb.collection('news').getList(1, 1);
        if (records.totalItems === 0) {
            console.log("Seeding initial news item...");
            await pb.collection('news').create({
                title: "Welcome to the New Oswayo Valley Website",
                slug: "welcome-new-site",
                content: "<p>We are excited to launch our new district website! This platform will serve as the central hub for all district news, events, and resources.</p>",
                excerpt: "We are excited to launch our new district website! This platform will serve as the central hub for all district news.",
            });
            console.log("Seed data created.");
        } else {
            console.log("News items already exist, skipping seed.");
        }
    } catch (err) {
        console.error("Error seeding data:", err);
    }

    console.log("Setup complete!");
}

main();
