const Warning = ({ message, type }) => {

    const className = type === "error" ? "warning error" : "warning";

    return (
        message && <p className={className}>{message}</p>
    );
};

export default Warning;
