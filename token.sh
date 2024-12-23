dfx deploy icrc1 --argument '( record {                     
      name = "DOGECRACY TOKEN";                         
      symbol = "DOGECY";                           
      decimals = 6;                                           
      fee = 1;                                        
      max_supply = 1_000_000_000_000;                         
      initial_balances = vec {                                
          record {                                            
              record {                                        
                  owner = principal "weulk-l4r56-5wp5r-xiixu-mmpzq-g6xp2-lwqw4-ke44h-mjadx-jo3zo-yqe";   
                  subaccount = null;                          
              };                                              
              100_000_000                                 
          }                                                   
      };                                                      
      min_burn_amount = 10_000;                         
      minting_account = null;                                 
      advanced_settings = null;                               
  })'