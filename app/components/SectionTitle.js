const SectionTitle = ({ children, className }) => {
    let styles = `text-2xl text-gray-800 font-light ${className}`;
    return (
        <>
            <h1 className={styles}>{children}</h1>
        </>
    )
};

export default SectionTitle;