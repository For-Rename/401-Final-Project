
import './loginForm.css'
export default function Login() {

    return (
        <>
            <form>
                <h1>Login</h1>
                <div class="inset">
                    <p>
                        <label for="User">User Name</label>
                        <input type="text" name="text" id="User" placeholder="User Name"/>
                    </p>
                    <p>
                        <label for="password">PASSWORD</label>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </p>
                </div>
                <p class="p-container">
                    <input type="submit" name="go" id="go" value="Log in"/>
                </p>
            </form>
        </>
    )
}

