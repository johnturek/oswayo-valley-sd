import styles from './PageHero.module.css';

export default function PageHero({ title, subtitle }) {
    return (
        <section className={styles.hero}>
            <div className={styles.shape + ' ' + styles.shape1} />
            <div className={styles.shape + ' ' + styles.shape2} />

            <div className={styles.heroContent}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
        </section>
    );
}
