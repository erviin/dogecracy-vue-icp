import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
module PetitionTypes {
    public type Base = {
        petitionId : Text;
        petitionTitle : Text;
        petitionDesc : Text;
        isTokenized : Bool;
        fundRaise : Bool;
        image : Blob;
        created : Int;
    };

    public type Voters = {
        petitionId : Text;
        name : Text;
        signature : Blob;
        isTokenized : Bool;
        created : Int;
    };

    public type FundRaising = {
        petitionId : Text;
        fundRaisingId : Text;
        tokenAddress : Text;
        fundTarget : Nat;
        dateTarget : Int;
        raisedAmount : Nat;
        created : Int;
    };
    public type Donation = {
        donationId : Text;
        fundRaisingId : Text;
        petitionId : Text;
        principalDonor : Text;
        amount : Nat;
        tokenAddress : Text;
        created : Int;
    };
    public type OffChainImage = {
        key : Text;
        name : Text;
        parentOwner : Text;
    };
};
