import { Post } from '../features/Feed/feedSlice'; // Adjust your imports if needed

export const mockFeeds: Record<string, Post[]> = {
    popular: [
        { id: 'pop1', title: 'Scientists discover new deep-sea species that glows in seven colors', author: 'ocean_nerd', score: 18200, num_comments: 1043, subreddit: 'popular', url: 'https://picsum.photos/seed/pop1/600/400', thumbnail: 'https://picsum.photos/seed/pop1/600/400' },
        { id: 'pop2', title: 'My grandma\'s 1962 recipe box survived a house fire. Here\'s what we found', author: 'family_archives', score: 9450, num_comments: 612, subreddit: 'popular', url: 'https://picsum.photos/seed/pop2/600/400', thumbnail: 'https://picsum.photos/seed/pop2/600/400' },
        { id: 'pop3', title: 'City replaces all streetlights with solar — results after one year', author: 'green_infra', score: 7300, num_comments: 389, subreddit: 'popular', url: 'https://picsum.photos/seed/pop3/600/400', thumbnail: 'https://picsum.photos/seed/pop3/600/400' }
    ],
    gaming: [
        { id: 'g1', title: 'Just beat the final boss after 80 hours, no regrets', author: 'pixel_knight', score: 4821, num_comments: 312, subreddit: 'gaming', url: 'https://picsum.photos/seed/g1/600/400', thumbnail: 'https://picsum.photos/seed/g1/600/400' },
        { id: 'g2', title: 'What\'s a game that completely changed how you think about the genre?', author: 'retro_gamer22', score: 1593, num_comments: 487, subreddit: 'gaming', url: 'https://picsum.photos/seed/g2/600/400', thumbnail: 'https://picsum.photos/seed/g2/600/400' },
        { id: 'g3', title: 'PSA: backup your save files before this patch', author: 'mod_warning', score: 2104, num_comments: 156, subreddit: 'gaming', url: 'https://picsum.photos/seed/g3/600/400', thumbnail: 'https://picsum.photos/seed/g3/600/400' }
    ],
    worldnews: [
        { id: 'w1', title: 'Coastal city completes 10-year flood barrier project ahead of schedule', author: 'global_watch', score: 6210, num_comments: 522, subreddit: 'worldnews', url: 'https://picsum.photos/seed/w1/600/400', thumbnail: 'https://picsum.photos/seed/w1/600/400' },
        { id: 'w2', title: 'New trade agreement signed between three island nations', author: 'desk_correspondent', score: 3890, num_comments: 201, subreddit: 'worldnews', url: 'https://picsum.photos/seed/w2/600/400', thumbnail: 'https://picsum.photos/seed/w2/600/400' },
        { id: 'w3', title: 'Volunteers plant one million trees in single coordinated weekend', author: 'earthwatch', score: 5120, num_comments: 178, subreddit: 'worldnews', url: 'https://picsum.photos/seed/w3/600/400', thumbnail: 'https://picsum.photos/seed/w3/600/400' }
    ],
    movies: [
        { id: 'm1', title: 'Unpopular opinion: the sequel was actually better paced than the original', author: 'film_buff_99', score: 2740, num_comments: 891, subreddit: 'movies', url: 'https://picsum.photos/seed/m1/600/400', thumbnail: 'https://picsum.photos/seed/m1/600/400' },
        { id: 'm2', title: 'What\'s a one-scene performance that completely stole the movie?', author: 'cinephile_corner', score: 4150, num_comments: 1203, subreddit: 'movies', url: 'https://picsum.photos/seed/m2/600/400', thumbnail: 'https://picsum.photos/seed/m2/600/400' },
        { id: 'm3', title: 'Just watched a 3-hour director\'s cut and somehow wanted more', author: 'long_runtime_fan', score: 1890, num_comments: 334, subreddit: 'movies', url: 'https://picsum.photos/seed/m3/600/400', thumbnail: 'https://picsum.photos/seed/m3/600/400' }
    ],
    music: [
        { id: 'mu1', title: 'This local band just opened for a headliner with zero warning, and crushed it', author: 'live_music_fan', score: 3320, num_comments: 245, subreddit: 'music', url: 'https://picsum.photos/seed/mu1/600/400', thumbnail: 'https://picsum.photos/seed/mu1/600/400' },
        { id: 'mu2', title: 'Found a vinyl pressing error and now it\'s worth way more than I paid', author: 'crate_digger', score: 1670, num_comments: 98, subreddit: 'music', url: 'https://picsum.photos/seed/mu2/600/400', thumbnail: 'https://picsum.photos/seed/mu2/600/400' },
        { id: 'mu3', title: 'What album do you think is criminally underrated?', author: 'deep_cuts_only', score: 5430, num_comments: 1567, subreddit: 'music', url: 'https://picsum.photos/seed/mu3/600/400', thumbnail: 'https://picsum.photos/seed/mu3/600/400' }
    ],
    technology: [
        { id: 't1', title: 'Built a home server from parts I found in the trash, AMA', author: 'dumpster_diy', score: 8120, num_comments: 643, subreddit: 'technology', url: 'https://picsum.photos/seed/t1/600/400', thumbnail: 'https://picsum.photos/seed/t1/600/400' },
        { id: 't2', title: 'New battery tech claims 2x density — here\'s the actual peer-reviewed paper', author: 'skeptical_engineer', score: 4560, num_comments: 412, subreddit: 'technology', url: 'https://picsum.photos/seed/t2/600/400', thumbnail: 'https://picsum.photos/seed/t2/600/400' },
        { id: 't3', title: 'My decade-old laptop just got a second life with a fresh Linux install', author: 'old_hardware_fan', score: 2980, num_comments: 287, subreddit: 'technology', url: 'https://picsum.photos/seed/t3/600/400', thumbnail: 'https://picsum.photos/seed/t3/600/400' }
    ]
};

// Flatten mockFeeds into an easily searchable key-value pair for Post Details lookup
export const mockPostsById: Record<string, Post> = Object.values(mockFeeds)
    .flat()
    .reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
    }, {} as Record<string, Post>);

export const mockComments = [
    {
        id: 'c1',
        author: 'velvet_oracle',
        author_icon: null,
        body: "This is genuinely one of the better posts I've seen on here today. Thanks for sharing the details.",
        score: 89,
        replies: [
            {
                id: 'c1-r1',
                author: 'thread_starter',
                author_icon: null,
                body: 'Appreciate it! Happy to answer any follow-up questions',
                score: 34,
                replies: [
                    {
                        id: 'c1-r1-r1',
                        author: 'velvet_oracle',
                        author_icon: null,
                        body: 'Will do, this is bookmarked for later',
                        score: 12,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 'c2',
        author: 'lukewarm_takes',
        author_icon: null,
        body: "Wait, is there a part two to this? Feels like there's more to the story",
        score: 56,
        replies: [
            {
                id: 'c2-r1',
                author: 'thread_starter',
                author_icon: null,
                body: 'Working on a follow-up post actually, stay tuned',
                score: 21,
                replies: []
            }
        ]
    },
    {
        id: 'c3',
        author: 'casual_lurker',
        author_icon: null,
        body: 'Saving this, exactly what I needed to see today',
        score: 18,
        replies: []
    }
];

export const mockSubreddits = [
    { name: 'gaming', icon: 'https://api.dicebear.com/9.x/shapes/svg?seed=gaming' },
    { name: 'worldnews', icon: 'https://api.dicebear.com/9.x/shapes/svg?seed=worldnews' },
    { name: 'movies', icon: 'https://api.dicebear.com/9.x/shapes/svg?seed=movies' },
    { name: 'music', icon: 'https://api.dicebear.com/9.x/shapes/svg?seed=music' },
    { name: 'technology', icon: 'https://api.dicebear.com/9.x/shapes/svg?seed=technology' },
];