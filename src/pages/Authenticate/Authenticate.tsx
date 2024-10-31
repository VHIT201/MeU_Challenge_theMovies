import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Components from './components/components';


function Authenticate() {
    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Function to handle admin login
    const handleAdminLogin = () => {
        navigate("/home");
    };

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "admin") {
            handleAdminLogin();
        } else {
            alert("Sign in failed. Please check your credentials.");
        }
    };

    return (
        <div 
            className="w-full min-h-screen flex justify-center items-center relative"
            style={{
                backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/VN-vi-20241028-TRIFECTA-perspective_740cbf61-d098-4d66-a34b-b3e4f0ae5fb7_large.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            
            <div className="relative z-10">
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Name' />
                            <Components.Input type='email' placeholder='Email' />
                            <Components.Input type='password' placeholder='Password' />
                            <Components.Button>Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>
    
                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSignIn}>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input 
                                type='email' 
                                placeholder='Email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <Components.Input 
                                type='password' 
                                placeholder='Password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                            <Components.Button type="submit">Sign In</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>
    
                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.Title>Welcome Back!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>
    
                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title>Hello, Friend!</Components.Title>
                                <Components.Paragraph>
                                    Enter your personal details and start your journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
        </div>
    );
}

export default Authenticate;
