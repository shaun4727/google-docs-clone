'use client';

import { ClerkProvider, SignIn, useAuth } from '@clerk/nextjs';
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';
import { FullScreenLoader } from './fullscreen-loader';
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<ConvexProviderWithClerk useAuth={useAuth} client={convex}>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>
					<div className="flex flex-col items-center justify-center min-h-screen">
						<SignIn />
					</div>
					<p>Please Log In</p>
				</Unauthenticated>
				<AuthLoading>
					<FullScreenLoader label="Auth Loading..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
