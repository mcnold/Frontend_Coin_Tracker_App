export default function Nav(props) {
    return(
        <nav>
            <form onSubmit={props.loginUser}>
                <strong>Login </strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="name">Password: </label>
                <input type="text" id="password" name="password"/>
                <input class="button-primary" type="submit" value="login" />
            </form>
            OR
            <form onSubmit={props.signup}>
                <strong>Sign Up </strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="name">Password: </label>
                <input type="password" id="password" name="password"/>
                <input class="button-primary"type="submit" value="signup" />
            </form>
        </nav>
    )
}