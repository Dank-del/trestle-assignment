import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../utils/firebase";
import {Link} from "react-router-dom";

export default function Profile() {
    const [user] = useAuthState(auth);
    if (!user) {
        return <Link className="text-3xl" to="/signin">Login</Link>
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Profile</h2>
                        <p className="text-xl text-gray-500">
                            Account information here
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            role="list"
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            <div className="space-y-4">
                                <div className="aspect-w-3 aspect-h-2">
                                    <img className="rounded-lg object-cover shadow-lg" src={user.photoURL!} alt=""/>
                                </div>
                                <div className="space-y-1 text-lg font-medium leading-6">
                                    <h3>{user.displayName}</h3>
                                    <p className="text-indigo-600">{user.email}</p>
                                </div>
                                <div className="text-lg">
                                    <p className="text-gray-500">Created on {user.metadata.creationTime}</p>
                                    <p className="text-gray-500">Last login on {user.metadata.lastSignInTime}</p>
                                </div>
                                <div className="text-lg">
                                    <p className="text-gray-500">Anonymous: {user.isAnonymous ? "True" : "False"}</p>
                                    <p className="text-gray-500">Tenant ID: {user.tenantId || "N/A"}</p>
                                </div>
                                <div className="text-lg">
                                    <h1 className="text-2-xl font-semibold">Raw User output</h1>
                                   <pre className="overflow-hidden" id="json">
                                       {JSON.stringify(user, undefined, 2)}
                                   </pre>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
