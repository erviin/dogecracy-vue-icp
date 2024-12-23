dfx deploy icrc1 --argument '( record {                     
      name = "DOGECRACY TOKEN";                         
      symbol = "DOGECY";                           
      decimals = 6;                                           
      fee = 1;                                        
      max_supply = 1_000_000_000_000;                         
      initial_balances = vec {                                
          record {                                            
              record {                                        
                  owner = principal "cet47-p4qzy-4bymg-dqlpy-fpwqg-yyrpg-sksxr-6vwhy-ff5u2-yjp6f-qae";   
                  subaccount = null;                          
              };                                              
              100_000_000                                 
          }                                                   
      };                                                      
      min_burn_amount = 10_000;                         
      minting_account = null;                                 
      advanced_settings = null;                               
  })'
