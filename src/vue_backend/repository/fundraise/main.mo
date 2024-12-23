import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
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
                        amount = args.amount;
                        created = createdTime;
                    };
            
            switch(donations.get(args.petitionId)) {
                case (null) {
                    var temp = HashMap.HashMap<Text, FundRaiseTypes.Donation>(1, Text.equal, Text.hash);
                    temp.put(callerText, newDonation);
                    donations.put(args.petitionId, temp);
                    "ok"
                };
                case (?existing) {
                    existing.put(callerText, newDonation);
                    "ok"
                };
            };
        };

        public func setFundRaise(caller:Principal, petitionId:Text, amountToRaise: Nat, reason:Text, endDate: Int) : async Text {
            // TODO : VERIFY IF IT"S THE OWNER HERE 
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



         public func preUpgrade() :   [var (Text, FundRaiseTypes.FundBase)]{
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

            temp
        };

        public func postUpgrade(stableData: [(Text, FundRaiseTypes.FundBase)]) : Text {
            for ((kv, vv) in stableData.vals()) {
                petitionFundRaise.put(kv, vv);
            };
            "ok"
        }
    }
}