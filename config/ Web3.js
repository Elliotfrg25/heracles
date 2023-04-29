const purchaseTokens = async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user ID" });
    }

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).send({ message: "Invalid amount" });
    }

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return res.status(500).send({ message: "Error finding user", error });
    }

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const fromAddress = user.ethereumAddress;
    const privateKey = Buffer.from(user.ethereumPrivateKey, "hex");
    const value = web3.utils.toWei(amount, "ether");

    try {
        const nonce = await web3.eth.getTransactionCount(fromAddress);

        const tx = {
            from: fromAddress,
            to: tokenContractAddress,
            value: value,
            gas: 200000,
            gasPrice: web3.utils.toWei("50", "gwei"),
            nonce: nonce,
            data: tokenContract.methods.buyTokens().encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        const updatedTokenBalance = await tokenContract.methods.balanceOf(fromAddress).call();
        user.tokenBalance = updatedTokenBalance;
        await user.save();

        const transaction = new Transaction({
            from: fromAddress,
            to: tokenContractAddress,
            value: amount,
            transactionHash: transactionReceipt.transactionHash,
            type: "purchase"
        });
        await transaction.save();

        res.status(200).send({ message: "Tokens purchased successfully", transaction });

    } catch (error) {
        console.error(error);
        if (error.message.includes("revert")) {
            res.status(500).send({ message: "Transaction reverted, possibly due to insufficient funds or contract error.", error });
        } else {
            res.status(500).send({ message: "Error purchasing tokens", error });
        }
    }
};
