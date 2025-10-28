import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <Image
                    src="/Main_BBG.svg"
                    alt="Web3Ceylon Logo"
                    width={220}
                    height={220}
                    className="mx-auto mb-4"
                />
                <p className="text-lg">Loading gallery...</p>
            </div>
        </div>
    );
}
