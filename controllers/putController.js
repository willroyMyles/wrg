module.exports = async(app, db) => {

    app.put('/posts/:id', async(req, res) => {

        if (req.body.body != undefined && req.body.body != "") {
            console.log("body present")
            var reply = {
                postId: req.params.id,
                userId: req.user._id,
                body: req.body.body,
            }

            await db.saveReply(reply);
        }


        var replies = await db.getReplies(req.params.id);
        console.log(replies);
        if (replies.res) {
            count = Array.from(replies.res).length
        } else count = 0;
        res.send({ replies: replies, count: count })
    })
}