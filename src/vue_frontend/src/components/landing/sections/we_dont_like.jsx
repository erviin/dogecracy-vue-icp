import DogecracyFundRaise from "./doge_fund_raise";
import OrSeparator from "@/components/ui/txtSeparator"
export default function DogecracyDoNotLikeThis() {
    return (
        <section className="container mx-auto px-4 lg:px-0 py-16 space-y-16 ">
            <section className="text-center">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4 font-intro text-brand-white">
                    Redefining Fundraising:Transparency and Accountability in Action
                </h1>
                <p className="text-md lg:text-lg text-brand-white">
                    Dogecracy reimagines the donation experience, leveraging blockchain technology to create an open, accountable, and efficient system.

                </p>
            </section>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-5/12">
                    <iframe width="100%" height="350" src="https://www.youtube.com/embed/Wa4vhXMbRIA?si=G5qwheKu8SMCOTyM" title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="flex-1 lg:px-4 space-y-2 lg:space-y-4">
                    <h1 className=" font-intro text-3xl lg:text-5xl text-brand">OUR DOGE DOES NOT LIKE THIS!</h1>
                    <p className="text-brand-white text-md lg:text-lg">Agus Salim, who has been in the spotlight in Indonesia recently. He is at the center of a controversy over alleged misuse of donations meant for his medical treatment, which has led to significant public criticism and personal distress for him. Agus denies the allegations and has expressed deep sadness over the accusations, claiming he has not done anything wrong. He has also apologized to the public for the ongoing issues and the negative attention they have brought
                        The situation also involves another figure, Pratiwi Noviyanthi, who was initially involved in raising funds for Agus. The disagreement between them has hindered reconciliation efforts. The case has drawn widespread attention, with public discussions about transparency in fundraising and the ethical responsibilities of those managing such funds
                    </p>
                </div>
            </div>
            <OrSeparator text="SO" />
            <DogecracyFundRaise />

        </section>);
}

