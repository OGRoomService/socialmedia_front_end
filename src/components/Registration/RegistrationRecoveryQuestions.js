export const RegistrationRecoveryQuestions = ({ nextStep, handleChange, formData }) => {
    // usestate of recovery questions so when someone picks one, disable it so it can't be picked twice
    // query list of questions from database


    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    return (
        <>
            <form
                onSubmit={Continue}
            >
                <p>
                    <label htmlFor="uname">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="username" />
                </p>
                <input type="submit" value="Sign Up" />
            </form>
        </>
    );
}