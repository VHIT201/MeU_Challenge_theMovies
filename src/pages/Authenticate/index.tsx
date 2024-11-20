import React, { useState } from 'react';
import * as Components from './components/components';
import { SignUpForm } from './SignUpForm';
import SignInForm from './SignInForm';
import { cn } from '@/utils';

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
                <div className="bg-black bg-opacity-80 rounded-lg shadow-lg shadow-black/25 w-[880px] max-w-full min-h-[1000px] relative overflow-hidden">
                    <Components.SignUpContainer signinIn={signIn}>
                        <SignUpForm />
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <SignInForm />
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <h1 className="font-bold m-0 text-gray-300 text-shadow-lg">Welcome back!</h1>
                                <p className="text-[16px] font-light leading-[24px] tracking-[0.5px] my-5 text-gray-300">
                                    To keep connected with us please login with your personal info
                                </p>
                                <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <h1 className="font-bold m-0 text-gray-300 text-shadow-lg">Hello, Friend!</h1>
                                <p className="text-[16px] font-light leading-[24px] tracking-[0.5px] my-5 text-gray-300">
                                    Enter your personal details and start your journey with us
                                </p>
                                <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </div>
            </div>
        </div>
    );
}

export default Authenticate;
