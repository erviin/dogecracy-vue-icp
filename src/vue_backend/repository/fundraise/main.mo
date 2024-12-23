import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import FundRaiseTypes "./types";

module {
    public class Service () {
        private var petitionFundRaise = HashMap.HashMap<Text, FundRaiseTypes.FundBase>(1, Text.equal, Text.hash);
        private var donations = HashMap.HashMap<Text, HashMap.HashMap<Text, FundRaiseTypes.Donation>>(1, Text.equal, Text.hash);

        public func donateNow(caller:Principal, txIndex:Nat,  args: FundRaiseTypes.DonationArgs) : async Text {
            let callerText = Principal.toText(caller);
            let createdTime : Int = Time.now() / 1_000_000_000;
            let newDonation: FundRaiseTypes.Donation = {
                        comment = args.comment;
                        txIndex = txIndex;
                        principal = callerText;
                        amount = args.amount;
                        created = createdTime;
                    };
            
            switch(donations.get(args.petitionId)) {
                case (null) {
                    var temp = HashMap.HashMap<Text, FundRaiseTypes.Donation>(1, Text.equal, Text.hash);
                    temp.put(Int.toText(Time.now()), newDonation);
                    donations.put(args.petitionId, temp);
                    "ok"
                };
                case (?existing) {
                    existing.put(Int.toText(Time.now()), newDonation);
                    "ok"
                };
            };
        };

        public func getTotalRaised(petitionId:Text) :async Nat {
            var total:Nat = 0;
             switch(donations.get(petitionId)) {
                case (null) {
                    total := 0;
                };
                case (?existing) {
                   for ((_, donation) in existing.entries()) {
                        total += donation.amount;
                    };
                };
            };
            total
        };
        
        public func getDonations(petitionId:Text) :async [(Text, FundRaiseTypes.Donation)] {
            switch (donations.get(petitionId)) {
                case (?donation) {
                    return Iter.toArray(donation.entries());
                };
                case (_) {
                    return [];
                };
            };
        };


        public func setFundRaise(petitionId:Text, amountToRaise: Nat, reason:Text, endDate: Int) : async Text {
            let createdTime : Int = Time.now() / 1_000_000_000;
              let newFundRaise = {
                        petitionId = petitionId;
                        reason = reason;
                        targetAmount= amountToRaise;
                        endDate = endDate;
                        created = createdTime;
                    };
            switch(petitionFundRaise.get(petitionId)) {
                case(null) {
                  
                    petitionFundRaise.put(petitionId, newFundRaise);
                    "ok"
                  };
                case(_) {
                    petitionFundRaise.put(petitionId, newFundRaise);
                    "updated"
                 };
            };
        };

        public func getFundRaise(petitionId:Text) : async ?FundRaiseTypes.FundBase {
            switch(petitionFundRaise.get(petitionId)) {
                case(null) {
                     null
                  };
                case(?existing) {
                    ?existing
                 };
            };
        };



         public func preUpgrade() :   [([var (Text, FundRaiseTypes.FundBase)], [var (Text, [(Text, FundRaiseTypes.Donation)])])]{
            var size : Nat = petitionFundRaise.size();
            var n: FundRaiseTypes.FundBase = {
                        petitionId = "petitionId";
                        reason = "reason";
                        targetAmount= 0;
                        endDate = 0;
                        created = 0;
                        };
            var temp : [var (Text, FundRaiseTypes.FundBase)] =  Array.init(size, ("aaaa-aaa", n));
            size := 0;
            for ((k, v) in petitionFundRaise.entries()) {
                temp[size] := (k, v);
                size += 1;
            };

            // DONATION
            var sizeDonation : Nat = donations.size();
            var tempDonation : [var (Text, [(Text, FundRaiseTypes.Donation)])] = Array.init(sizeDonation, ("aaaa-aaa", []));
            sizeDonation := 0;
            for ((kD, vD) in donations.entries()) {
                tempDonation[sizeDonation] := (kD, Iter.toArray(vD.entries()));
                sizeDonation += 1;
            };
            // END DONATION

            [(temp, tempDonation)]

        };

        public func postUpgrade(sFundRaise: [(Text, FundRaiseTypes.FundBase)], sDonation: [(Text, [(Text, FundRaiseTypes.Donation)])])  {
            for ((kv, vv) in sFundRaise.vals()) {
                petitionFundRaise.put(kv, vv);
            };

            // DONATION
            for ((kD, vD) in sDonation.vals()) {
                let allowed_tempD = HashMap.fromIter<Text, FundRaiseTypes.Donation>(vD.vals(), 1, Text.equal, Text.hash);
                donations.put(kD, allowed_tempD);
            };
            // END DONATION

        }
    }
}