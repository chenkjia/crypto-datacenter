import { Service } from 'egg';
import { Network, Alchemy } from 'alchemy-sdk';
import Web3 from 'web3';
import { ethers } from 'ethers';
const web3 = new Web3();
import IUniswapV2PairAbi from './abi/IUniswapV2Pair.json';
export const wssProvider = new ethers.providers.WebSocketProvider(
  'wss://eth-mainnet.g.alchemy.com/v2/VP8HbkayBbeQqFjOLXUg69snsiQKNhWG',
);
// Used to send transactions, needs ether
export const searcherWallet = new ethers.Wallet(
  '0000000000000000000000000000000000000000000000000000000000000001',
  wssProvider,
);
// Common contracts
const uniswapV2Pair = new ethers.Contract(
  ethers.constants.AddressZero,
  IUniswapV2PairAbi,
  searcherWallet,
);


// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: '7d8AiemrLOt26kRlqvgGssaNYyBLAetC', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
// Listen to all new pending transactions.
export const markets = [
  {
    chain: 'ethereum',
    name: 'univ2',
    address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  },
  {
    chain: 'ethereum',
    name: 'univ3',
    address: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
  },
  {
    chain: 'ethereum',
    name: 'inch',
    address: '0x1111111254fb6c44bAC0beD2854e76F90643097d',
  },
  {
    chain: 'ethereum',
    name: 'cow',
    address: '0x9008d19f58aabd9ed0d60971565aa8510560ab41',
  },
  {
    chain: 'ethereum',
    name: 'metamask',
    address: '0x881D40237659C251811CEC9c364ef91dC08D300C',
  },
  {
    chain: 'ethereum',
    name: '0x',
    address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  },
];

const decodeFunc = {
  univ3: {
    '0x5ae401dc': (data, params) => {
      const calls = web3.eth.abi.decodeParameters(
        [ 'uint256', 'bytes[]' ],
        data,
      )[1];
      for (let index = 0; index < calls.length; index++) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        decode(calls[index], params);
      }
    },
    '0x472b43f3': (data, params) => {
      const decoded = web3.eth.abi.decodeParameters(
        [ 'uint256', 'uint256', 'address[]', 'address' ],
        data,
      );
      // ?????????x2y2????????????eth??????3??????
      if (
        decoded[2][0] === '0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9' &&
        decoded[0] > 5 * 10 ** 22
      ) {
        console.log({
          amountIn: Number(decoded[0]),
          amountOutMin: Number(decoded[1]),
          ...params,
        });
      }
    },
  },
};
const decode = (call, params) => {
  const s = call.slice(0, 10);
  if (decodeFunc[params.market] && decodeFunc[params.market][s]) {
    const data = call.slice(10);
    return decodeFunc[params.market][s](data, params);
  }
  return null;
};
/**
 * Transfers Service
 */
export default class Collect extends Service {
  public async start() {
    markets.forEach(({ name, address }) => {
      alchemy.ws.on(
        {
          method: 'alchemy_pendingTransactions',
          toAddress: address,
        },
        async res => {
          if (
            res.input.indexOf('1e4ede388cbc9f4b5c79681b7f94d36a11abebc9') !== -1
          ) {
            const [ reserve0, reserve1 ] = await uniswapV2Pair.attach('0x6033368e4a402605294c91cf5c03d72bd96e7d8d').getReserves();
            this.ctx.model.Transfer.create({
              ...res,
              market: name,
              reserve0: reserve0.toHexString(),
              reserve1: reserve1.toHexString(),
            });
            console.log(reserve0);
            console.log(reserve1);
            console.log(name);
            console.log(res);
            console.log(new Date());
          }
        },
      );
    });
    return 'start';
  }
}
