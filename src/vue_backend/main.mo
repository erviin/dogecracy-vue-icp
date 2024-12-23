import PetitionTypes "./types";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";
import FundRaise "repository/fundraise/main";
import FundRaiseTypes "repository/fundraise/types";

actor DogecracyBase {
  stable var petitionEntries : [(Text, [(Text, PetitionTypes.Base)])] = [];
  private var petitions = HashMap.HashMap<Text, HashMap.HashMap<Text, PetitionTypes.Base>>(1, Text.equal, Text.hash);

  stable var voteEntries : [(Text, [(Text, PetitionTypes.Voters)])] = [];
  private var voters = HashMap.HashMap<Text, HashMap.HashMap<Text, PetitionTypes.Voters>>(1, Text.equal, Text.hash);
  
  stable var petitionFundRaiseEntries : [(Text, FundRaiseTypes.FundBase)] = [];
  stable var petitionDonationEntries : [(Text, [(Text, FundRaiseTypes.Donation)])] = [];

  let fundRaiseService = FundRaise.Service();

  public shared func getFundRaise(petitionId:Text): async ?FundRaiseTypes.FundBase {
    await fundRaiseService.getFundRaise(petitionId)
  };

  public shared func donate(caller:Principal, txIndex:Nat, args:FundRaiseTypes.DonationArgs): async Text {
    await fundRaiseService.donateNow(caller, txIndex, args);
  };

  public shared ({caller}) func setFundRaise(petitionId:Text, amountToRaise: Nat, reason:Text, endDate: Int): async Text {
    // TODO : VERIFY IF IT"S THE OWNER HERE 
    await fundRaiseService.setFundRaise(petitionId, amountToRaise, reason, endDate)
  };

  public shared func getTotalRaised(petitionId:Text): async Nat {
    await fundRaiseService.getTotalRaised(petitionId)
  };

  public shared func getDonations(petitionId:Text) :async [(Text, FundRaiseTypes.Donation)] {
      await fundRaiseService.getDonations(petitionId)
  };



  private func generateId(callerText : Text) : Text {
    let timestamp = Time.now();
    callerText # "-" # Int.toText(timestamp);
  };

  

  public shared (msg) func createPetition(
    petitionTitle : Text,
    petitionDesc : Text,
    image : Blob,
  ) : async Text {
    let createdTime : Int = Time.now() / 1_000_000_000; // Convert nanoseconds to seconds
    let callerText = Principal.toText(msg.caller);
    let id = generateId(callerText);
    let newPetition : PetitionTypes.Base = {
      petitionId = id;
      petitionTitle = petitionTitle;
      petitionDesc = petitionDesc;
      image = image;
      isTokenized = false;
      fundRaise = false;
      created = createdTime;
    };

    var temp = HashMap.HashMap<Text, PetitionTypes.Base>(1, Text.equal, Text.hash);
    temp.put(id, newPetition);
    switch (petitions.get(callerText)) {
      case (null) {
        petitions.put(callerText, temp);
      };
      case (?existing) {
        existing.put(id, newPetition);
      };
    };

    return id;

  };

  public query func getAllPetitions(): async  [(Text, PetitionTypes.Base)] {
    var result: [(Text, [(Text, PetitionTypes.Base)])] = [];
    // REFACTOR TO BE MORE EFFICIENT FOR EXPLORE-PETITIONS
    // 1 level
    var allInnerResult: [(Text, PetitionTypes.Base)] = [];
    for ((outerKey, innerMap) in petitions.entries()) {
        var innerResult: [(Text, PetitionTypes.Base)] = [];

        // 2 level
        for ((innerKey, base) in innerMap.entries()) {
            innerResult := Array.append(innerResult, [(innerKey, base)]);
            allInnerResult := Array.append(allInnerResult, [(innerKey, base)]);
        };

        result := Array.append(result, [(outerKey, innerResult)]);
    };

    return allInnerResult;
  };

  public query ({ caller }) func getMyPetitions() : async [(Text, PetitionTypes.Base)] {
    let callerText = Principal.toText(caller);

    switch (petitions.get(callerText)) {
      case (?my_petitions) {
        return Iter.toArray(my_petitions.entries());
      };
      case (_) {
        return [];
      };
    };
  };

  public shared func getPetitionDetail(
    owner : Text,
    petitionId : Text,
  ) : async ?PetitionTypes.Base {

    switch (petitions.get(owner)) {
      case (?my_petitions) {
        return my_petitions.get(petitionId);
      };
      case null return null;
    };
  };

  // public shared func updateVoter(petitionId : Text, voterId : Text, updatedVoter : PetitionTypes.Voters) : async {
  //   // Step 1: Get the inner HashMap
  //   switch (votersMap.get(petitionId)) {
  //     case (?innerMap) {
  //       // Step 2: Update the inner HashMap
  //       innerMap.put(voterId, updatedVoter);

  //       // Step 3: Reinstate the updated inner HashMap into the outer HashMap
  //       votersMap.put(petitionId, innerMap);
  //     };
  //     case (_) {
  //       Debug.print("Petition ID not found");
  //     };
  //   };
  // };

  public shared (msg) func votePetition(
    petitionId : Text,
    name : Text,
    image : Blob,
  ) : async PetitionTypes.Voters {

    let createdTime : Int = Time.now() / 1_000_000_000; // Convert nanoseconds to seconds
    let callerText = Principal.toText(msg.caller);
    let newVote : PetitionTypes.Voters = {
      petitionId = petitionId;
      name = name;
      signature = image;
      isTokenized = false;
      created = createdTime;
    };

    switch (voters.get(petitionId)) {
      case (null) {
        var temp = HashMap.HashMap<Text, PetitionTypes.Voters>(1, Text.equal, Text.hash);
        temp.put(callerText, newVote);
        voters.put(petitionId, temp);
      };
      case (?existing) {
        existing.put(callerText, newVote);
      };
    };

    return newVote;

  };

  public query func getPetitionVoters(
    petitionId : Text
  ) : async [(Text, PetitionTypes.Voters)] {

    switch (voters.get(petitionId)) {
      case (?existing) {
        let maxResults = 7; // Set the maximum number of results
        // var count = 0;
        var vArray = Iter.toArray(existing.entries());
        var size = vArray.size();
        var x = if (maxResults <= size) { maxResults } else { size };
        return Array.tabulate<(Text, PetitionTypes.Voters)>(
          x,
          func(i) {
            vArray[i];
          },
        );
      };
      case (_) {
        return [];
      };
    };

  };

  public query ({ caller }) func getMySign(
    petitionId : Text
  ) : async ?PetitionTypes.Voters {

    let callerText = Principal.toText(caller);
    switch (voters.get(petitionId)) {
      case (?myVote) {
        return myVote.get(callerText);
      };
      case (_) {
        return null;
      };
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  /*
    * upgrade functions
    */
  system func preupgrade() {

    /* Petition */
    var size : Nat = petitions.size();
    var temp : [var (Text, [(Text, PetitionTypes.Base)])] = Array.init(size, ("aaaa-aaa", []));
    size := 0;
    for ((k, v) in petitions.entries()) {
      temp[size] := (k, Iter.toArray(v.entries()));
      size += 1;
    };
    petitionEntries := Array.freeze(temp);
    /* end Petition */

    /* Voters */
    var sizeVote : Nat = voters.size();
    var tempVote : [var (Text, [(Text, PetitionTypes.Voters)])] = Array.init(sizeVote, ("aaaa-aaa", []));
    sizeVote := 0;
    for ((kVote, vVote) in voters.entries()) {
      tempVote[sizeVote] := (kVote, Iter.toArray(vVote.entries()));
      sizeVote += 1;
    };
    voteEntries := Array.freeze(tempVote);
    /* end Voters */
    
    /* FUND RAISE */
    var fundRaisePre:[([var (Text, FundRaiseTypes.FundBase)], [var (Text, [(Text, FundRaiseTypes.Donation)])])] = fundRaiseService.preUpgrade();
    petitionFundRaiseEntries := Array.freeze(fundRaisePre[0].0);
    petitionDonationEntries := Array.freeze(fundRaisePre[0].1);
    /* END FUND RAISE */

  };

  system func postupgrade() {
    /* Petition */
    for ((k, v) in petitionEntries.vals()) {
      let allowed_temp = HashMap.fromIter<Text, PetitionTypes.Base>(v.vals(), 1, Text.equal, Text.hash);
      petitions.put(k, allowed_temp);
    };
    petitionEntries := [];
    /* End Petition */

    /* Voters */
    for ((kv, vv) in voteEntries.vals()) {
      let allowed_tempV = HashMap.fromIter<Text, PetitionTypes.Voters>(vv.vals(), 1, Text.equal, Text.hash);
      voters.put(kv, allowed_tempV);
    };
    voteEntries := [];
    /* End Voters */


     /* FUND RAISE */
    fundRaiseService.postUpgrade(petitionFundRaiseEntries, petitionDonationEntries);
    petitionFundRaiseEntries := [];
    petitionDonationEntries :=[];
    /* END FUND RAISE */

  };

};
