import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DogecracyPetition() {
    return (
        <section className="container mx-auto px-4 lg:px-0 lg:py-16 space-y-4 lg:space-y-8">
            <section className="text-center">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4 font-intro text-brand-white">Empowering Change with Decentralized Petitions</h1>
                <p className="text-md lg:text-xl text-brand-white">
                    At Dogecracy, we believe in the power of collective voices to drive meaningful change.
                </p>
            </section>
            <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="flex flex-col space-y-2">
                    <Card className="bg-transparent shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="font-intro space-x-2">
                                <Badge className="bg-brand font-intro mb-2">1</Badge> <span className="text-brand-white">Why Decentralized Petitions?</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-brand-white">
                            <p>
                                Traditional petitions often lack transparency and impact. Dogecracy transforms petitions into NFT-based records,
                                ensuring immutability and authenticity. By supporting social movements through decentralized voting,
                                we empower individuals to sign petitions that truly make a difference.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-tranparent shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="font-intro space-x-2">
                                <Badge className="bg-brand font-intro mb-2">2</Badge> <span className="text-brand-white">A Voice for Everyone, Powered by DAO</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-brand-white">
                            <p>
                                Dogecracy is not just a platform; it&apos;s a movement. Through our DAO (Decentralized Autonomous Organization) governance,
                                voters can collaboratively decide what actions should be taken, how funds should be utilized, and how to ensure accountability.
                                Together, we aim to be both witnesses and participants in the change we want to see.
                            </p>
                        </CardContent>
                    </Card>

                </div>
                <Card className="bg-transparent shadow-none border-none h-min">
                    <CardHeader>
                        <CardTitle className="font-intro space-x-2">
                            <Badge className="bg-brand font-intro mb-2">2</Badge> <span className="text-brand-white">Beyond Signatures – Integrated Fundraising and Tokenization</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-brand-white">
                        <p>
                            In Dogecracy, petitions become actionable. When local governments fail to address critical issues,
                            our platform integrates fundraising directly into petitions, enabling communities to fund initiatives
                            and protests that create real change.
                        </p>
                        <p>
                            As a petition gains significant support—through high signature counts and donations—it can evolve into
                            a productive movement with its own custom token. This token represents the movement&apos;s impact and future potential.
                        </p>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2 font-intro text-brand">Token holders can:</h4>
                            <ul className="list-disc pl-6 space-y-2 text-brand-white">
                                <li>Trade the token as an asset on blockchain platforms.</li>
                                <li>Share in profits generated when the movement successfully achieves its goals or launches a sustainable initiative.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <div className="text-center lg:mt-8">
                <h2 className="text-3xl font-bold mb-4 font-intro text-brand-white">Join Dogecracy</h2>
                <p className="text-lg">
                    Make your voice part of a global, decentralized movement where ideas, action, and opportunity come together.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                    <Badge variant="secondary">Web3</Badge>
                    <Badge variant="secondary">Decentralized</Badge>
                    <Badge variant="secondary">Blockchain</Badge>
                    <Badge variant="secondary">DAO</Badge>
                </div>
                <Button size="lg" className=" mt-8 text-brand font-intro hover:bg-brand/30">
                    Spread your voice
                </Button>
            </div>
        </section>
    )
}

