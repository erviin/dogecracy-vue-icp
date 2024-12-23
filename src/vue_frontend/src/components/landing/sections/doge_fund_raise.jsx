import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export default function DogecracyFundRaise() {
    return (
        <section className="container mx-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-6/12">
                <Card className="bg-transparent shadow-none border-none">
                    <CardHeader>
                        <CardTitle className="font-intro space-x-2">
                            <Badge className="bg-brand font-intro mb-2">1</Badge> <span className="text-brand">Breaking the Myths: Blockchain is Transparent, Not Secretive</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-brand/80">
                        <p>
                            Contrary to common misconceptions, blockchain isn&apos;t a hidden network—it&apos;s a public ledger. Every transaction is traceable and visible to anyone with internet access. This transparency ensures that funds are always accountable, erasing doubts about where contributions are allocated.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-transparent shadow-none border-none">
                    <CardHeader>
                        <CardTitle className="font-intro space-x-2">
                            <Badge className="bg-brand font-intro mb-2">3</Badge> <span className="text-brand">Our Vision: A Transparent and Collaborative Future</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-brand/80">
                        <p className="text-lg">
                            Dogecracy isn&apos;t just about rethinking fundraising—it&apos;s about building a system where people help each other openly and efficiently. By combining blockchain technology with a decentralized governance model, we aim to create a platform that drives real-world impact while restoring faith in collective action.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <Badge variant="secondary" className="bg-brand/20 hover:bg-brand/30 text-brand-white">Transparency</Badge>
                            <Badge variant="secondary" className="bg-brand/20 hover:bg-brand/30 text-brand-white">Accountability</Badge>
                            <Badge variant="secondary" className="bg-brand/20 hover:bg-brand/30 text-brand-white">Blockchain</Badge>
                            <Badge variant="secondary" className="bg-brand/20 hover:bg-brand/30 text-brand-white">Decentralized Governance</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-transparent shadow-none border-none flex-1">
                <CardHeader>
                    <CardTitle className="font-intro space-x-2">
                        <Badge className="bg-brand font-intro mb-2">2</Badge> <span className="text-brand">Beyond Fundraising: From Donations to Solutions</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-brand-white space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center text-brand">
                            <CheckCircle2 className="mr-2" /> Accountable Spending
                        </h3>
                        <p>
                            Once fundraising goals are met, the public can decide through Dogecracy&apos;s platform:
                        </p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Should the organizer withdraw the funds?</li>
                            <li>Or should they spend the funds directly with trusted merchants listed on Dogecracy?</li>
                        </ul>
                        <p>This ensures funds are used exactly as intended.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center text-brand">
                            <CheckCircle2 className="mr-2" /> Empowering Contributors
                        </h3>
                        <p>
                            Donors can track the lifecycle of their contributions, from collection to impact, building trust and engagement.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center text-brand">
                            <CheckCircle2 className="mr-2" /> Integrating Stablecoin Commerce
                        </h3>
                        <p>
                            In the next stage, Dogecracy will offer a marketplace where businesses provide services or products paid for with stablecoins. This connects communities with tangible resources and promotes practical, accountable spending.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>)
}