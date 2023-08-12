import styled from 'styled-components';

export const RoomCard = styled.div`
    width: 190px;
    height: 45px;
    border-radius: 10px;
    border: 1px solid #cecece;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.selected ? '#ffeed2' : ''};
    background-color: ${props => props.disabled ? '#e9e9e9' : ''};
    color: ${props => props.disabled ? '#cecece' : ''};
    :hover {
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    }
    p {
        margin-left: 10px;
    }
`;

export const Icons = styled.div`
    display: flex;
    gap: 3px;
    margin-right: 10px;
`;
