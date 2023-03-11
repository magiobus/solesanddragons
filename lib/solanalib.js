import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
const { SystemProgram, Keypair } = web3;

//SETUP
const programID = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ADDRESS);
const network = clusterApiUrl("devnet");
const opts = { preflightCommitment: "processed" };

const solanalib = {};

// PUBLIC FUNCTIONS
//GET WALLET ADDRESS FROM PHANTOM, IF NOT CONNECTED, RETURN NULL
solanalib.getWallet = async (solana) => {
  if (!solana?.isPhantom) return null;

  //if the user has a phantom wallet, get the public key and auto connect
  try {
    const { publicKey } = await solana.connect({
      onlyIfTrusted: true,
    });
    return publicKey.toString();
  } catch (error) {
    console.error("There's no wallet connected yet", error);
    return null;
  }
};

//CONNECT WALLET
solanalib.connectWallet = async (solana) => {
  try {
    const { publicKey } = await solana.connect();
    return publicKey.toString();
  } catch (error) {
    return null;
  }
};

//generate baseaccount from localstorage
solanalib.getBaseAccountFromLocalStorage = (localStorage) => {
  const _baseAccount = localStorage.getItem("baseaccount");
  let _newBaseAccount = null;
  if (_baseAccount) {
    //if there is, we need to check if the wallet address is the same as the one in localStorage
    const _localStorageWalletAddress = JSON.parse(_baseAccount);
    const { publicKey, secretKey } = _localStorageWalletAddress._keypair;

    //Parse the public and secret key to Uint8Array
    const arrPublicKey = Object.values(publicKey);
    const arrSecretKey = Object.values(secretKey);
    const _newPublicKey = new Uint8Array(arrPublicKey);
    const _newSecretKey = new Uint8Array(arrSecretKey);

    _newBaseAccount = new Keypair({
      publicKey: _newPublicKey,
      secretKey: _newSecretKey,
    });
  } else {
    _newBaseAccount = null;
  }
  return _newBaseAccount;
};

//get pairkey for new base account
solanalib.generateBaseAccount = () => {
  const baseAccount = Keypair.generate();
  return baseAccount;
};

//initialize account
solanalib.initializeAccount = async (baseAccount, solana, localStorage) => {
  try {
    const provider = _getProvider(solana);
    const program = await _getProgram(solana);

    console.log("initializing account function", baseAccount, solana);
    if (!baseAccount || !solana) {
      throw new Error("baseAccount or solana object is null");
      return;
    }

    const initializedBaseAccount = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log(
      "Initialized base account with public key:",
      baseAccount.publicKey.toString()
    );

    console.log(" initializedBaseAccount =>", initializedBaseAccount);
  } catch (error) {
    throw new Error(error);
    console.log("Error creating BaseAccount account:", error);
  }
};

//get program from solana
solanalib.getProgram = async (solana) => {
  return await _getProgram(solana);
};

//get provider from solana
solanalib.getProvider = (solana) => {
  return _getProvider(solana);
};

//----------PRIVATE FUNCTIONS
const _getProvider = (solana) => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    solana,
    opts.preflightCommitment
  );
  return provider;
};

//Get the program from the solana program, we need a connected wallet
const _getProgram = async (solana) => {
  // Get metadata about your solana program
  const idl = await Program.fetchIdl(programID, _getProvider(solana));
  // Create a program that you can call
  return new Program(idl, programID, _getProvider(solana));
};

export default solanalib;
