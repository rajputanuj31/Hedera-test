// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;

interface IPrngSystemContract {
    function getPseudorandomSeed() external returns (bytes32);
}
