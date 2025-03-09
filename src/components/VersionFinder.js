import React, { useState } from 'react';
import './VersionFinder.css';

const VersionFinder = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'app_name', direction: 'asc' });

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return ' ↕';
    };

    const generateLink = (source, appName) => {
        if (source === 'Github') {
            return `https://github.com/${appName}/releases`;
        } else if (source === 'Docker') {
            return appName.includes('/')
                ? `https://hub.docker.com/r/${appName}/tags`
                : `https://hub.docker.com/_/${appName}/tags`;
        }
        return null;
    };

    return (
        <div className="background">
            <div className="container mt-4">
                <h1 className="version-finder-title text-center mb-4">Version Finder</h1>
                <div className="table-responsive">
                    {data.length === 0 ? (
                        <div className="alert alert-info text-center" role="alert">
                            No data available or API call returned an empty list.
                        </div>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col" onClick={() => requestSort('source')}>Source{getArrow('source')}</th>
                                <th scope="col" onClick={() => requestSort('app_name')}>App Name{getArrow('app_name')}</th>
                                <th scope="col" onClick={() => requestSort('version')}>Version{getArrow('version')}</th>
                                <th scope="col" onClick={() => requestSort('latest_version')}>Latest Version{getArrow('latest_version')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedData.map(item => (
                                <tr key={item.app_name}>
                                    <td>{item.source}</td>
                                    <td>
                                        {item.source === 'Github' || item.source === 'Docker' ? (
                                            <a href={generateLink(item.source, item.app_name)} target="_blank" rel="noopener noreferrer">
                                                {item.app_name}
                                            </a>
                                        ) : (
                                            item.app_name
                                        )}
                                    </td>
                                    <td>{item.version}</td>
                                    <td>{item.latest_version}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VersionFinder;