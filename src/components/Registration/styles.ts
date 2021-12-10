import styled from "styled-components";

export const Container = styled.div`
    .actions {
        display: flex;
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            &:nth-child(1) {
                margin-right: 1rem;
            }
        }
    }
`;