import { Fragment } from 'react';

interface IForProps<T> {
    children: (item: T) => JSX.Element; // Function returning JSX.Element
    each: T[]; // Array of typed items
    keyI: keyof T; // Restrict keyI to existing keys of T
    cond?: boolean; // Optional boolean prop
    wrap?: (content: React.ReactNode) => React.ReactNode; // Function returning wrapper element
    before?: React.ReactNode; // React node
    after?: React.ReactNode; // React node
    empty?: React.ReactNode; // React node
    isLoading?: boolean; // Optional boolean prop
    loading?: React.ReactNode; // React node
    isError?: boolean; // Optional boolean prop
    error?: React.ReactNode; // React node
}

export function For<T>({
    children,
    each,
    keyI,
    cond = true,
    wrap,
    before,
    after,
    empty,
    isLoading,
    loading,
    isError,
    error,
}: IForProps<T>): React.ReactNode {
    const c = each.length > 0 && cond;

    if (isLoading) return loading ?? null;

    if (isError) return error ?? null;

    if (!c) return empty ?? null;

    const content = each.map((item, index) => (
        // Use keyI to dynamically access the key from the item
        <Fragment key={String(item[keyI]) || index}>{children(item)}</Fragment>
    ));

    return (
        c && (
            <>
                {before}
                {wrap ? wrap(content) : content}
                {after}
            </>
        )
    );
}
