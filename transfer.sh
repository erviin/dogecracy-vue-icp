dfx canister call icrc1 icrc1_transfer "(record {
  amount = 1_000_000;
  to = record {
    owner = principal \"qbrtq-end5i-gbfq3-mtj37-ckkit-furwd-43ifa-vibho-uzhuk-7c3pu-dqe\";
  };
})"