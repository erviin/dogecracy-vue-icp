import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
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