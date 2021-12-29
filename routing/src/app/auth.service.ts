export class AuthService {

    isAuthenticated: boolean = false;

    isUserValidated() {
        return new Promise(
            (resolve, reject)=> {
                setTimeout(()=> {
                    resolve(this.isAuthenticated);
                }, 1000);
            }
        );
    }

    login() {
        this.isAuthenticated = true;
        console.log("Logged In")
    }

    logout() {
        this.isAuthenticated = false;
        console.log("Logged Out");
    }
}