import { GoogleLogin } from 'react-google-login'


const CLIENT_ID = "442607078588-g2sitipbnhfagfbvd8vvmrq4op6qsf2m.apps.googleusercontent.com"


function GoogleLogInButton() {
    
    const saveToken = (res) => {
        console.log(res)
        fetch('api/google/save_credentials',{method: 'POST',
                                             headers: {"Content-Type": "application/json"},
                                             // , "Content-Type": "application/x-www-form-urlencoded"}
                                             body: JSON.stringify(res)}
        ).then(res => res.json()
        ).then(data => {
            console.log(data)
        })
        }
                                        

    const responseGoogle = (res) => {
        console.log(res);

      }

    return <div class='google-signin'> 
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Authorize your Google account"
                onSuccess={saveToken}
                onFailure={responseGoogle}
                // approvalPrompt="force"
                prompt='consent'
                online='offline'
                isSignedIn={true}
                responseType='code' // get a refresh token and use it to get an access token in backend
                cookiePolicy={'single_host_origin'}
                scope="https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly"
            />
           </div>
}

   
export default GoogleLogInButton;
