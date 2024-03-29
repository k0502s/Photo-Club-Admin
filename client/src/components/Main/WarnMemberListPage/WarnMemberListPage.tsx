import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import WarnCard from './Section/WarnCard';
import WarnImg from '../../../assets/img/Warn.png';
import Pagination from '@material-ui/lab/Pagination';
import { Loader } from '../../Loader/Loader';
import { MEMBER_WARNLIST_REQUEST, CLEAR_ERROR_REQUEST_1 } from '../../../redux/types';
import { CardTitle, CardText, Row, Col, CardHeader, CardBody } from 'reactstrap';
import * as S from './WarnMemberListPage.style';

type State = {
    auth: {
        user: { cart: [{id: string}] };
        totalPages: number;
        isLoading: boolean;
    };
};

const WarnMemberList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number | string>(5);
    const { totalPages, isLoading, user } = useSelector((state: State) => state.auth);
    const pageSizes = [5, 10];

    const getRequestParams = (page: number, pageSize: number | string) => {
        let params: any = {};

        if (page) {
            params.page = page - 1;
        }

        if (pageSize) {
            params.size = pageSize;
        }

        return params;
    };

    useEffect(() => {
        const params = getRequestParams(page, pageSize);
        let warnLists: string[] = [];

        if (user && user.cart)
            if (user.cart.length > 0) {
                user.cart.forEach((item) => {
                    warnLists.push(item.id);
                });
                const body = {
                    warnListsId: warnLists,
                    list: user.cart,
                    page: params.page,
                    size: params.size,
                };

                dispatch({
                    type: MEMBER_WARNLIST_REQUEST,
                    payload: body,
                });
                dispatch({
                    type: CLEAR_ERROR_REQUEST_1,
                });
            }
    }, [user, page, pageSize]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(e.target.value);
        setPage(1);
    };

    const Body = (
        <>
            <S.Title>
                <h1>WARN MEMBER LIST</h1>
            </S.Title>
            <hr />
            <Row>
                <Helmet title={`경고 회원 리스트`} />
                <Col md={5} sm={12}>
                    <S.WarnCard margin={'30px'}>
                        <CardHeader>
                            <strong>경고 회원 참고 사항</strong>
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">※ 경고 회원 관리 안내</CardTitle>
                            <br />
                            <CardText>1. 경고 횟수가 3번이 누적되면 관리자 임의로 제명할 수 있습니다.</CardText>
                            <br />
                            <CardText>2. 동호회 규정 어김 및 동호회 일정 기간내 모임 미참여 등등이 경고 원인이 될 수 있습니다.</CardText>
                            <br />
                            <CardText>3. 회원 리스트 페이지에서 특정 회원을 경고 할 수 있는 버튼이 있습니다.</CardText>
                            <br />
                            <CardText>4. 경고 이후 동호회 활동에 더 이상 규정을 어기지 않고 정상적인 활동이 지속되면 일정 기간 이후 경고를 해제 할 수 있습니다.</CardText>
                        </CardBody>
                        <S.WarnImg src={WarnImg} />
                    </S.WarnCard>
                </Col>
                <Col md={7}>
                    <WarnCard />
                    <Col md={{ offset: 4 }} className="mt-3">
                        <S.Span margin={'250px'}>Page: </S.Span>
                        <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col>
                        <Pagination variant="outlined" count={totalPages} page={page} siblingCount={1} boundaryCount={1} shape="rounded" onChange={handlePageChange} />
                    </Col>
                </Col>
            </Row>
        </>
    );

    return <>{isLoading ? Loader : Body}</>;
};

export default WarnMemberList;
