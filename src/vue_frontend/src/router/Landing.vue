<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <main class="space-y-8">
    <section class="relative px-4 pt-16 pb-16 lg:pt-32 lg:pb-16">
      <div
        class="container mx-auto space-x-0 space-y-12 text-center lg:flex lg:space-y-0 lg:flex-row lg:justify-between lg:items-center"
      >
        <div class="flex h-full lg:w-5/12 md:h-auto">
          <div
            v-motion
            ::initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3, delay: 0.1 }"
          >
            <img
              alt="Democracy for justice"
              height="1000"
              width="750"
              src="/images/justice-god.png"
            />
          </div>
        </div>

        <div
          ::initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          class="absolute top-0 left-0 z-10 h-full px-4 py-16 xl:h-auto lg:relative lg:px-0 lg:py-0 bg-black/50 backdrop-blur"
        >
          <div
            class="flex flex-col justify-center h-full space-y-8 text-center lg:flex-1 lg:items-center"
          >
            <div
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.6 }"
            >
              <h1 class="text-4xl font-bold md:text-6xl font-intro">
                THE ONLY DOGE FOR GOOD
              </h1>
            </div>
            <div
              :initial="{ opacity: 0, y: 20 }"
              :enteranimate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.8 }"
            >
              <div class="max-w-2xl text-lg text-center lg:text-xl">
                We are building the foundation for every type of DAO, empowering
                communities to shape the future. Today at
                <Badge class="bg-brand font-intro">stage #1</Badge> we start THE
                CHANGE for the social movement, petition and fundraising.
              </div>
            </div>
            <div
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0.1 }"
            >
              <Button size="lg" class="text-brand font-intro hover:bg-brand/30">
                Start Your Petition Today!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.12 }"
    >
      <section
        class="container flex flex-col-reverse items-center px-4 py-8 mx-auto space-y-4 lg:py-16 lg:space-y-12 lg:flex-row lg:space-x-4"
      >
        <div
          class="flex flex-col flex-1 mt-12 space-y-6 text-center lg:pr-8 lg:mt-0"
        >
          <section class="text-center">
            <h1 class="mb-1 text-2xl font-intro lg:text-5xl text-brand">
              What is Dogecracy?
            </h1>
            <div class="text-md lg:text-xl text-brand-white">
              Sounds like a <Badge class="bg-brand">MEME</Badge> but our
              Doge is
              <Badge class="bg-emerald-500 font-intro">DIFFERENT</Badge>
            </div>
          </section>
          <div class="text-lg leading-1 text-brand-white">
            <span class="font-intro ">Dogecracy</span> is a groundbreaking
            <Badge class="font-intro bg-gray-950 text-brand">DAO</Badge>
            (Decentralized Autonomous Organization) platform built on Web3 and
            blockchain technology.
            <Badge class="font-intro bg-gray-950 text-brand"
              >It’s designed to empower social movements</Badge
            >, amplify voices, and create
            <Badge class="font-intro bg-gray-950 text-brand"
              >real-world impact</Badge
            >
            through decentralized petitions, transparent governance, and
            innovative fundraising mechanisms.
            <br />
            At its core, Dogecracy
            <Badge class="font-intro bg-gray-950 text-brand"
              >revolutionizes</Badge
            >
            traditional petitions by turning them into
            <Badge class="font-intro bg-gray-950 text-brand"
              >NFT-backed</Badge
            >
            records that are immutable and verifiable. The platform goes beyond
            signatures, integrating fundraising and tokenization to
            <Badge class="font-intro bg-gray-950 text-brand"
              >transform</Badge
            >
            petitions into actionable and productive movements. Supporters can
            even
            <Badge class="font-intro bg-gray-950 text-brand">launch</Badge>
            custom tokens tied to successful campaigns, enabling trading,
            profit-sharing, and sustainable change.
            <br />
            With Dogecracy, people have a platform where their
            <Badge class="font-intro bg-gray-950 text-brand"
              >voices matter</Badge
            >, their causes are heard, and their collective actions can
            <Badge class="font-intro bg-gray-950 text-brand"
              >shape the future.</Badge
            >
            It’s more than a platform
            <Badge class="font-intro bg-gray-950 text-brand"
              >it’s a decentralized movement for change</Badge
            >
          </div>
        </div>
        <div class="p-4 rounded-full bg-brand-white">
          <img
            src="/icon.ico"
            height="750"
            width="500"
            alt="What is dogecracy?"
          />
        </div>
      </section>
    </div>
    <div
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.14 }"
    >
      <section
        class="container px-4 mx-auto space-y-4 lg:px-0 lg:py-16 lg:space-y-8"
      >
        <section class="text-center">
          <h1
            class="mb-4 text-2xl font-bold lg:text-4xl font-intro text-brand-white"
          >
            Empowering Change with Decentralized Petitions
          </h1>
          <p class="text-md lg:text-xl text-brand-white">
            At Dogecracy, we believe in the power of collective voices to drive
            meaningful change.
          </p>
        </section>
        <div class="flex flex-col lg:flex-row lg:items-center">
          <div class="flex flex-col space-y-2">
            <Card class="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle class="space-x-2 font-intro">
                  <Badge class="mb-2 bg-brand font-intro">1</Badge>
                  <span class="text-brand-white"
                    >Why Decentralized Petitions?</span
                  >
                </CardTitle>
              </CardHeader>
              <CardContent class="text-brand-white">
                <p>
                  Traditional petitions often lack transparency and impact.
                  Dogecracy transforms petitions into NFT-based records,
                  ensuring immutability and authenticity. By supporting social
                  movements through decentralized voting, we empower individuals
                  to sign petitions that truly make a difference.
                </p>
              </CardContent>
            </Card>
            <Card class="border-none shadow-none bg-tranparent">
              <CardHeader>
                <CardTitle class="space-x-2 font-intro">
                  <Badge class="mb-2 bg-brand font-intro">2</Badge>
                  <span class="text-brand-white"
                    >A Voice for Everyone, Powered by DAO</span
                  >
                </CardTitle>
              </CardHeader>
              <CardContent class="text-brand-white">
                <p>
                  Dogecracy is not just a platform; it&apos;s a movement.
                  Through our DAO (Decentralized Autonomous Organization)
                  governance, voters can collaboratively decide what actions
                  should be taken, how funds should be utilized, and how to
                  ensure accountability. Together, we aim to be both witnesses
                  and participants in the change we want to see.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card class="bg-transparent border-none shadow-none h-min">
            <CardHeader>
              <CardTitle class="space-x-2 font-intro">
                <Badge class="mb-2 bg-brand font-intro">2</Badge>
                <span class="text-brand-white"
                  >Beyond Signatures – Integrated Fundraising and
                  Tokenization</span
                >
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4 text-brand-white">
              <p>
                In Dogecracy, petitions become actionable. When local
                governments fail to address critical issues, our platform
                integrates fundraising directly into petitions, enabling
                communities to fund initiatives and protests that create real
                change.
              </p>
              <p>
                As a petition gains significant support—through high signature
                counts and donations—it can evolve into a productive movement
                with its own custom token. This token represents the
                movement&apos;s impact and future potential.
              </p>
              <div class="mt-4">
                <h4 class="mb-2 font-semibold font-intro text-brand">
                  Token holders can:
                </h4>
                <ul class="pl-6 space-y-2 list-disc text-brand-white">
                  <li>Trade the token as an asset on blockchain platforms.</li>
                  <li>
                    Share in profits generated when the movement successfully
                    achieves its goals or launches a sustainable initiative.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="text-center lg:mt-8">
          <h2 class="mb-4 text-3xl font-bold font-intro text-brand-white">
            Join Dogecracy
          </h2>
          <p class="text-lg">
            Make your voice part of a global, decentralized movement where
            ideas, action, and opportunity come together.
          </p>
          <div class="flex justify-center mt-4 space-x-2">
            <Badge variant="secondary">Web3</Badge>
            <Badge variant="secondary">Decentralized</Badge>
            <Badge variant="secondary">Blockchain</Badge>
            <Badge variant="secondary">DAO</Badge>
          </div>
          <Button
            size="lg"
            class="mt-8 text-brand font-intro hover:bg-brand/30"
          >
            Spread your voice
          </Button>
        </div>
      </section>
    </div>
    <div
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.16 }"
    >
      <section class="container px-4 py-16 mx-auto space-y-16 lg:px-0 ">
        <section class="text-center">
          <h1
            class="mb-4 text-2xl font-bold lg:text-4xl font-intro text-brand-white"
          >
            Redefining Fundraising:Transparency and Accountability in Action
          </h1>
          <p class="text-md lg:text-lg text-brand-white">
            Dogecracy reimagines the donation experience, leveraging blockchain
            technology to create an open, accountable, and efficient system.
          </p>
        </section>
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-5/12">
            <iframe
              width="100%"
              height="350"
              src="https://www.youtube.com/embed/Wa4vhXMbRIA?si=G5qwheKu8SMCOTyM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div class="flex-1 space-y-2 lg:px-4 lg:space-y-4">
            <h1 class="text-3xl font-intro lg:text-5xl text-brand">
              OUR DOGE DOES NOT LIKE THIS!
            </h1>
            <p class="text-brand-white text-md lg:text-lg">
              Agus Salim, who has been in the spotlight in Indonesia recently.
              He is at the center of a controversy over alleged misuse of
              donations meant for his medical treatment, which has led to
              significant public criticism and personal distress for him. Agus
              denies the allegations and has expressed deep sadness over the
              accusations, claiming he has not done anything wrong. He has also
              apologized to the public for the ongoing issues and the negative
              attention they have brought The situation also involves another
              figure, Pratiwi Noviyanthi, who was initially involved in raising
              funds for Agus. The disagreement between them has hindered
              reconciliation efforts. The case has drawn widespread attention,
              with public discussions about transparency in fundraising and the
              ethical responsibilities of those managing such funds
            </p>
          </div>
        </div>
        <OrSeparator text="SO" />
        <section class="container flex flex-col mx-auto lg:flex-row">
          <div class="w-full lg:w-6/12">
            <Card class="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle class="space-x-2 font-intro">
                  <Badge class="mb-2 bg-brand font-intro">1</Badge>
                  <span class="text-brand"
                    >Breaking the Myths: Blockchain is Transparent, Not
                    Secretive</span
                  >
                </CardTitle>
              </CardHeader>
              <CardContent class="text-brand/80">
                <p>
                  Contrary to common misconceptions, blockchain isn&apos;t a
                  hidden network—it&apos;s a public ledger. Every transaction is
                  traceable and visible to anyone with internet access. This
                  transparency ensures that funds are always accountable,
                  erasing doubts about where contributions are allocated.
                </p>
              </CardContent>
            </Card>
            <Card class="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle class="space-x-2 font-intro">
                  <Badge class="mb-2 bg-brand font-intro">3</Badge>
                  <span class="text-brand"
                    >Our Vision: A Transparent and Collaborative Future</span
                  >
                </CardTitle>
              </CardHeader>
              <CardContent class="text-brand/80">
                <p class="text-lg">
                  Dogecracy isn&apos;t just about rethinking
                  fundraising—it&apos;s about building a system where people
                  help each other openly and efficiently. By combining
                  blockchain technology with a decentralized governance model,
                  we aim to create a platform that drives real-world impact
                  while restoring faith in collective action.
                </p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <Badge
                    variant="secondary"
                    class="bg-brand/20 hover:bg-brand/30 text-brand-white"
                    >Transparency</Badge
                  >
                  <Badge
                    variant="secondary"
                    class="bg-brand/20 hover:bg-brand/30 text-brand-white"
                    >Accountability</Badge
                  >
                  <Badge
                    variant="secondary"
                    class="bg-brand/20 hover:bg-brand/30 text-brand-white"
                    >Blockchain</Badge
                  >
                  <Badge
                    variant="secondary"
                    class="bg-brand/20 hover:bg-brand/30 text-brand-white"
                    >Decentralized Governance</Badge
                  >
                </div>
              </CardContent>
            </Card>
          </div>

          <Card class="flex-1 bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle class="space-x-2 font-intro">
                <Badge class="mb-2 bg-brand font-intro">2</Badge>
                <span class="text-brand"
                  >Beyond Fundraising: From Donations to Solutions</span
                >
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4 text-brand-white">
              <div class="space-y-2">
                <h3
                  class="flex items-center text-xl font-semibold text-brand"
                >
                  <CheckCircle2 class="mr-2" /> Accountable Spending
                </h3>
                <p>
                  Once fundraising goals are met, the public can decide through
                  Dogecracy&apos;s platform:
                </p>
                <ul class="pl-4 list-disc list-inside">
                  <li>Should the organizer withdraw the funds?</li>
                  <li>
                    Or should they spend the funds directly with trusted
                    merchants listed on Dogecracy?
                  </li>
                </ul>
                <p>This ensures funds are used exactly as intended.</p>
              </div>
              <div class="space-y-2">
                <h3
                  class="flex items-center text-xl font-semibold text-brand"
                >
                  <CheckCircle2 class="mr-2" /> Empowering Contributors
                </h3>
                <p>
                  Donors can track the lifecycle of their contributions, from
                  collection to impact, building trust and engagement.
                </p>
              </div>
              <div class="space-y-2">
                <h3
                  class="flex items-center text-xl font-semibold text-brand"
                >
                  <CheckCircle2 class="mr-2" /> Integrating Stablecoin
                  Commerce
                </h3>
                <p>
                  In the next stage, Dogecracy will offer a marketplace where
                  businesses provide services or products paid for with
                  stablecoins. This connects communities with tangible resources
                  and promotes practical, accountable spending.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </section>
    </div>
    <section id="features" class="px-4 lg:py-16">
      <div class="container mx-auto">
        <section class="mb-12 text-center">
          <h1 class="mb-4 text-2xl font-bold lg:text-4xl font-intro text-brand">
            DAO & FEATURES
          </h1>
          <p class="text-md lg:text-xl text-brand-white">
            Empowering Communities with Transparency, Governance, and
            Impact-Driven Tools
          </p>
        </section>

        <div class="flex flex-col-reverse lg:flex-row">
          <div class="w-full mt-8 lg:mt-0 lg:w-5/12">
            <div class="text-lg lg:px-4 text-brand-white">
              <Badge class="text-brand font-intro">DAO</Badge> (Decentralized
              Autonomous Organization) is like an online community or group that
              runs itself using
              <Badge class="text-brand font-intro"
                >blockchain technology.</Badge
              >
              Instead of relying on
              <Badge class="text-brand font-intro">a single leader</Badge> or
              <Badge class="text-brand font-intro">a central institution</Badge>
              to make decisions, a DAO uses smart contracts—which are like
              digital rules stored on the blockchain.
              <br />
              <div class="my-2 text-brand font-intro">How it works?</div>
              <ul>
                <li>
                  <Badge class="text-brand font-intro"> Members Join</Badge
                  >People join a DAO by buying or earning its tokens, which
                  often act like a membership pass.
                </li>
                <li>
                  <Badge class="text-brand font-intro"
                    >Decisions Are Voted On</Badge
                  >Members use their tokens to vote on important decisions, like
                  how to use funds or start projects.
                </li>
                <li>
                  <Badge class="text-brand font-intro">Transparency</Badge>Every
                  vote and action is recorded on the blockchain, so everyone can
                  see what’s happening.
                </li>
              </ul>
              <div
                class="p-2 mt-4 text-black rounded-lg lg:mt-1 bg-brand font-intro"
              >
                Think of it as a group project where everyone has a say, the
                rules are fair, and there’s no middleman—just code ensuring
                everything works smoothly.
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div class="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3
                  class="mb-4 text-xl font-semibold text-brand font-intro"
                >
                  Your Voice, Decentralized
                </h3>
                <p>
                  Launch and sign online petitions integrated with Web3
                  technology to amplify your voice and drive real change.
                </p>
              </div>
              <div class="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3
                  class="mb-4 text-xl font-semibold text-brand font-intro"
                >
                  Fund Change Securely
                </h3>
                <p>
                  Combine petitions with decentralized fundraising tools to
                  support impactful causes transparently and securely.
                </p>
              </div>
              <div class="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3
                  class="mb-4 text-xl font-semibold text-brand font-intro"
                >
                  DAO for Every Cause
                </h3>
                <p>
                  From governance to innovation, DOGECRACY aims to host a
                  diverse range of DAOs tailored to your needs.
                </p>
              </div>
              <div class="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3
                  class="mb-4 text-xl font-semibold text-brand font-intro"
                >
                  Empowered by Blockchain
                </h3>
                <p>
                  Enjoy transparency, trust, and decentralization in every
                  aspect of community collaboration.
                </p>
              </div>
              <div class="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3
                  class="mb-4 text-xl font-semibold text-brand font-intro"
                >
                  Join the Movement
                </h3>
                <p>
                  Be part of the revolution that makes your voice matter in the
                  decentralized world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
