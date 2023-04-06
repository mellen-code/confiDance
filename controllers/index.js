const Story = require('../models/Story')

module.exports = {

// @desc Login/landing page
// @route GET /
    getLogin: (req, res) => {
        res.render('login', {
            layout: 'login',
        })
    },


// @desc Dashboard
// @route GET /dashboard
    getDashboard: async (req, res) => {
        try {
            const stories = await Story.find({ user: req.user.id }).lean()

        // This week's number of entries:
            let weeks = await Story.aggregate( 
                [
                {
// https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/dateTrunc/
                    $project: {
                        week: { $week: "$createdAt"},
                        thisWeek: { date: new Date() },
                        thisWeekNum: { $week: new Date()},
                        truncateThisWeek: {
                            $dateTrunc: {
                            date: "$createdAt", unit: "week", binSize: 1, 
                            timezone: "America/New_York", startOfWeek: "Monday" 
                            }
                        }
                        }
                    }
            ])
            

            // let weekDates = await Story.aggregate(
            //     [
            //         {
            //             $project: {
            //                 truncateThisWeek: {
            //                     $dateTrunc: {
            //                     date: "$createdAt", unit: "week", binSize: 1, 
            //                     timezone: "America/New_York", startOfWeek: "Monday" 
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // )

            var count = 0;
            let thisWeek = weeks[0].thisWeekNum
            let getThisWeekNum = function() {
                for (let i=0; i < weeks.length; i++) {
                    if (weeks[i].week == thisWeek) {
                        count++
                    }
                }
                return count;
            }

        // Top Week's number of entries:
            let getTopWeekNum = function() {
                let res = [];
                for (let item of weeks) {
                    res.push(item.week)
                }
               
                let numMap = {};
    
                for (let num of res) {
                    if (numMap.hasOwnProperty(num)) {
                        numMap[num] ++
                    } else {
                        numMap[num] = 1
                    }
                }

                    let maxNumValue = 0
                    let maxNum = ''

                    for (let num in numMap) {
                        if (numMap[num] > maxNumValue) {
                            maxNumValue = numMap[num]
                            maxNum = num
                        }
                    }
                    return maxNum
                }
    
            res.render('dashboard', {
                name: req.user.firstName,
                stories,
                getThisWeekNum,
                getTopWeekNum
            })

            console.log(getTopWeekNum())
            console.log(weeks)
            // console.log(weekDates)
            
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }   
    }
}