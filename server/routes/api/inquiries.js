import express from 'express';
import Chat from '../../models/Chat.js';

const router = express.Router();

//=================================
//             inquiries
//=================================


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get('/', async (req, res) => {
    try {
        console.log(req.query)
        const { page, size } = req.query;
        
        const { limit, offset } = getPagination(page, size);

        await Chat.paginate({}, { offset, limit }).then((data) => {
            console.log(data);
            res.send({
                totalItems: data.totalDocs,
                inquiriesdata: data.docs.reverse(),
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Chat.findByIdAndRemove(id, { useFindAndModify: false }).then((data) => {
            res.send({
                success: true,
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send(err);
    }
});


export default router;
