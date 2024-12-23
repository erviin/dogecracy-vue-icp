import Nat "mo:base/Nat";
module FundRaiseTypes {
    public type FundBase = {
        petitionId : Text;
        reason : Text;
        targetAmount: Nat;
        endDate : Int;
        created : Int;
    };

    public type Donation = {
        amount: Nat;
        comment : Text;
        principal : Text;
        txIndex: Nat;
        created : Int;
    };

    public type DonationArgs = {
        petitionId: Text;
        amount: Nat;
        comment : Text;
        created : Int;
    };

}