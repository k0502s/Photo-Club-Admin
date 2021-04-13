import styled from 'styled-components';
import { Col, CardBody, Card, Button } from 'reactstrap';
import { BsPersonFill, BsUpload, BsTrash } from 'react-icons/bs';

const PersonIcon = styled(BsPersonFill)`
    width: 300px;
    height: 240px;
    color: lightgrey;
`;
const uploadIcon = styled(BsUpload)`
    color: white;
    margin-bottom: 5px;
    margin-right: 5px;
`;
const deleteIcon = styled(BsTrash)`
    color: white;
    margin-bottom: 5px;
    margin-right: 5px;
`;

const button = styled(Button)`
    margin-right: 10px;
    font-weight: bold;
    color: white;
    background-color: ${(props) => props.color};

    &:hover {
        color: white;
        background-color: lightslategray;
    }
`;
const Profile = styled.div`
    width: 300px;
    height: 240px;
    border-radius: 55%;
    border: 1px solid lightgray;
    margin-bottom: 15px;
    display: block;
    margin: 0px auto;
    text-align: center;
`;

const Img = styled.img`
    width: 300px;
    height: 240px;
    border-radius: 55%;
    border: 1px solid lightgray;
`;

const FileUpload = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`;

const pngImg = styled.img`
    width: 400px;
    height: 432px;
    display: block;
    margin: 0px auto;
    @media only screen and (max-width: 500px) {
        width: 300px;
        height: 332px;
    }
`;

const card = styled(Card)`
    height: 780px;
    @media only screen and (max-width: 500px) {
        margin-top: 30px;
    }
`;
export { Profile, Img, FileUpload, pngImg, card, deleteIcon, PersonIcon, uploadIcon, button };
