"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }

        setUpProviders()
    }, [])

    return (
        <nav className="w-full flex-between pt-3 mb-16">
            <Link
                href="/"
                className="flex-center gap-2"
            >
                <Image 
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />

                <p className="logo_text">
                    Promptopia
                </p>
            </Link>

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex md:gap-5 gap-3">
                        <Link
                            href="/create-prompt"
                            className="black_btn"
                        >
                            Create Post
                        </Link>

                        <button
                            type="button"
                            className="outline_btn"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image 
                                src={session?.user.image}
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && (
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        )}
                    </>
                )}
            </div>

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image 
                            src={session?.user.image}
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut()
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && (
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar