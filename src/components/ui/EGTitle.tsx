import { ReactNode } from "react";

export default function EGTitle({children}:{children:ReactNode}) {
    return (
        <h2 className='font-bold text-3xl text-[--base-color]'>{children}</h2>
    );
}