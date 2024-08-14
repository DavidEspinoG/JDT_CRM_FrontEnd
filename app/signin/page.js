import SectionTitle from "../components/SectionTitle";

const SignIn = () => {
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
    return (
        <>  
        <section className="flex w-full justify-center h-full items-center">
            <div className="p-3">
                <SectionTitle className={'text-center mb-5'}>
                    Sign in
                </SectionTitle>
                <form className="bg-white p-7 flex flex-col gap-2 rounded">
                    <label className={labelStyles} htmlFor="name">
                        Name
                    </label>
                    <input placeholder="Your name" id="name" className={inputStyles}/>
                    <label className={labelStyles} htmlFor="lastname">
                        Last Name
                    </label>
                    <input placeholder="Your last name" id="lastname" className={inputStyles}/>
                    <label className={labelStyles} htmlFor="email">
                        Email
                    </label>
                    <input placeholder="Your email" id="email" className={inputStyles}/>
                    <label className={labelStyles} htmlFor="password">
                        Password
                    </label>
                    <input placeholder="Your password" id="password" className={inputStyles} type="password"/>
                    <input type="submit" value="Sign in" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                </form>
            </div>
        </section>
        </>
    )
};

export default SignIn;