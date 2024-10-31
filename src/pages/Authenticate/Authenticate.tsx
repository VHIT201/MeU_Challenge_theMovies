import React, { useState } from 'react';
import * as Components from './components/components';
import { LoginForm } from './Login/Login';
import { SignUpForm } from './SignUp/SignUp';

function Authenticate() {
    const [signIn, toggle] = useState(true);

    return (
        <div
            className="w-full min-h-screen flex justify-center items-center relative"
            style={{
                backgroundImage:
                    "url('https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/VN-vi-20241028-TRIFECTA-perspective_740cbf61-d098-4d66-a34b-b3e4f0ae5fb7_large.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            <div className="relative z-10">
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <SignUpForm />
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <LoginForm />
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.Title>Welcome Back!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title>Hello, Friend!</Components.Title>
                                <Components.Paragraph>
                                    Enter your personal details and start your journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
        </div>
    );
}

export default Authenticate;
