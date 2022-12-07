// HOW THE PAGE LIST WILL LOOK LIKE
// --> STARTING AT PAGE 1 --> [1], 2, 3, 4 ... 10, 20, 30.... last page
// --> STARTING AT PAGE 2 --> 1, [2], 3, 4, 5 .... 10, 20, 30... last page
// --> STARTING AT PAGE 12 --> 1 ... 10, 11, [12], 13, 14, ... 20, 30, 40... last page

function generatePages (req, res, next) {
    let pageList = []
    let nrPages = req.totalPages
    if (nrPages <= 2) {
        for (i=1;i<=nrPages;i++) {
            pageList.push(i)
        }
    } else {
        let v = 1
        let j = req.page-2 || 1
        if (j > 3) {
            pageList.push(1) // the page list should always contain the first page
        }
        while (v <= 5 && j <= req.totalPages) {
            if (j>0) {
                pageList.push(j++)
                v++
            } else {
                j++
            }
        }
        if (v == 6) {
            let validate = true
            let x = 1
            while (validate == true) {
                let farPage = Math.ceil(pageList[pageList.legnth-1]/10)*x*10
                if (req.totalPages > farPage && x < 4) {
                    if (pageList.includes(farPage)) {
                        x++
                    } else {
                        x++
                        pageList.push(farPage)
                    }
                } else {
                    validate = false
                }
            }
        } if(!pageList.includes(req.totalPages)) {
            pageList.push(req.totalPages) // the page list should always contain the last page
        }
    }
    
    req.pageList = pageList
    next()
}

module.exports = {generatePages}