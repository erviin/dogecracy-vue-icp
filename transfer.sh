dfx canister call icrc1 icrc1_transfer "(record {
  amount = 1_000_000;
  to = record {
    owner = principal \"u3vxk-ycdic-uvbwd-c5tnv-qji4k-oc75a-c4pdo-mhu64-x5dlt-kct3o-rae\";
  };
})"