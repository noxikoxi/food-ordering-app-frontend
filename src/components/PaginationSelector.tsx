import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

function PaginationSelector({page, pages, onPageChange} : Props) {

    const pageNumbers = [];
    for(let i= 1; i <= pages; ++i)
    {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page !== 1 && (
                        <PaginationPrevious href="#" onClick={() => onPageChange(page-1)}/>
                    )}
                </PaginationItem>
                {pageNumbers.map((number, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page !== pageNumbers.length && (
                    <PaginationItem >
                        <PaginationNext href='#' onClick={() => onPageChange(page+1)}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationSelector;