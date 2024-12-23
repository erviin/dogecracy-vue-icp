import { Badge } from "../../ui/badge";

export default function WhatIsDogecracy() {
    return (

        <section className="container  items-center mx-auto px-4 py-8 lg:py-16 lg:space-y-12 flex flex-col-reverse lg:flex-row space-y-4 lg:space-x-4">
            <div className="flex-1 flex space-y-6  flex-col lg:pr-8 text-center mt-12 lg:mt-0">
                <section className="text-center">
                    <h1 className="font-intro text-2xl mb-1 lg:text-5xl text-brand">What is Dogecracy?</h1>
                    <div className="text-md lg:text-xl text-brand-white">
                        Sounds like a <Badge className="bg-brand">MEME</Badge> but our Doge is <Badge className="bg-emerald-500 font-intro">DIFFERENT</Badge>
                    </div>
                </section>
                <div className="leading-1 text-lg text-brand-white">
                    <span className="font-intro ">Dogecracy</span> is a groundbreaking
                    <Badge className="font-intro bg-gray-950 text-brand">DAO</Badge>
                    (Decentralized Autonomous Organization) platform built on Web3 and blockchain technology.
                    <Badge className="font-intro bg-gray-950 text-brand">It’s designed to empower social movements</Badge>,
                    amplify voices, and create <Badge className="font-intro bg-gray-950 text-brand">real-world impact</Badge>
                    through decentralized petitions, transparent governance, and innovative fundraising mechanisms.
                    <br />
                    At its core, Dogecracy
                    <Badge className="font-intro bg-gray-950 text-brand">revolutionizes</Badge>
                    traditional petitions by turning them into
                    <Badge className="font-intro bg-gray-950 text-brand">NFT-backed</Badge>
                    records that are immutable and verifiable. The platform goes beyond signatures, integrating fundraising and tokenization to
                    <Badge className="font-intro bg-gray-950 text-brand">transform</Badge> petitions into actionable and productive movements. Supporters can even
                    <Badge className="font-intro bg-gray-950 text-brand">launch</Badge>
                    custom tokens tied to successful campaigns, enabling trading, profit-sharing, and sustainable change.
                    <br />
                    With Dogecracy, people have a platform where their
                    <Badge className="font-intro bg-gray-950 text-brand">voices matter</Badge>, their causes are heard, and their collective actions can
                    <Badge className="font-intro bg-gray-950 text-brand">shape the future.</Badge> It’s more than a platform
                    <Badge className="font-intro bg-gray-950 text-brand">it’s a decentralized movement for change</Badge>
                </div>
            </div>
            <div className="bg-brand-white p-4 rounded-full">
                <img src={'/icon.ico'} height={750} width={500} alt="What is dogecracy?" />
            </div>
        </section>
    );
}