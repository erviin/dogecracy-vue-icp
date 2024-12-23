dfx canister call icrc1 icrc1_transfer "(record {
  amount = 1_000_000;
  to = record {
    owner = principal \"y7bem-obajc-53ky6-mbans-ljit4-ihlqv-sd4zn-d2l5j-4dmju-l3opk-yqe\";
  };
})"