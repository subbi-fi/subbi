import React, { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import Button from "components/Button";
import { useUSDCContract } from "hooks/contracts";
import { IApproveButton } from "types/props";
import { MAX_UINT, WEB_3_ROOT_KEY } from "config";

const ApproveButton = ({
  subscriptionContractAddress,
  onError,
  onApproval,
  style,
}: IApproveButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const usdc = useUSDCContract();
  const { account } = useWeb3React(WEB_3_ROOT_KEY);

  const handleApproval = useCallback(async () => {
    if (!usdc) {
      console.log("No contract found. Did you set the SubbiProvider properly?");
      return;
    }

    setIsLoading(true);
    try {
      if (account) {
        const allowance = await usdc.allowance(
          account,
          subscriptionContractAddress
        );
        if (
          ethers.BigNumber.from(allowance).eq(ethers.BigNumber.from(MAX_UINT))
        ) {
          if (onApproval) {
            await onApproval();
          }
          Promise.resolve();
        }
      }

      const tx = await usdc.approve(subscriptionContractAddress, MAX_UINT);
      await tx.wait();

      if (onApproval) {
        await onApproval();
      }
    } catch (error) {
      console.log("Error requesting approval: ", error);

      if (onError) {
        await onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [usdc, onError, onApproval]);

  return (
    <Button
      variant="primary"
      loading={isLoading}
      onClick={handleApproval}
      style={style}
    >
      Approve spending
    </Button>
  );
};

export default ApproveButton;
