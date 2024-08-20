const FormError = ({ message }) => {
    return (
        <div className="bg-red-100 p-4 border-l-4 border-red-500">
            <p className="text-red-800">{ message }</p>
        </div>
    )
};

export default FormError;