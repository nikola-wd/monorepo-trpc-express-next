const shared = ['']

const variants = {
    display: {
        base: 'flex',
        inline: 'inline-flex',
    },

    flow: {
        row: 'flex-row',
        rowReverse: 'flex-row-reverse',
        col: 'flex-col',
        colReverse: 'flex-col-reverse',
    },
    justify: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    },
    items: {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
    },
    self: {
        auto: 'self-auto',
        start: 'self-start',
        end: 'self-end',
        center: 'self-center',
        stretch: 'self-stretch',
        baseline: 'self-baseline',
    },
    selfJustify: {
        auto: 'justify-self-auto',
        start: 'justify-self-start',
        end: 'justify-self-end',
        center: 'justify-self-center',
        stretch: 'justify-self-stretch',
    },

    place: {
        center: 'items-center justify-center',
    },
}

export { shared, variants }
